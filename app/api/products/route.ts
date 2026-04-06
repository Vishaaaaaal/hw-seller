import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import productsData from "@/lib/data/products.json";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const brand = formData.get("brand") as string;
        const category = formData.get("category") as string;
        const scale = formData.get("scale") as string;
        const vehicleType = formData.get("vehicleType") as string;
        const quantity = parseInt(formData.get("quantity") as string, 10);
        const priceRaw = parseFloat(formData.get("price") as string);
        const imageFile = formData.get("image") as File;

        if (!title || !brand || !category) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Storing locally in whole units since INR formatPrice scales natively
        let listPrice = isNaN(priceRaw) ? 0 : priceRaw;

        let slug = title.toLowerCase().replace(/[\s\W-]+/g, "-");

        // Write image if provided
        if (imageFile && imageFile.name) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const ext = path.extname(imageFile.name) || ".jpg";
            const fileName = `${slug}${ext}`;
            const filePath = path.join(process.cwd(), "public", "images", "products", fileName);
            await fs.writeFile(filePath, buffer);
        }

        // Append to JSON
        const newProduct = {
            name: title,
            brand,
            category,
            subcategory: category,
            price: listPrice,
            image: imageFile && imageFile.name ? `/images/products/${slug}${path.extname(imageFile.name) || ".jpg"}` : undefined,
            originalPrice: listPrice,
            stockStatus: quantity > 0 ? "In Stock" : "Sold Out",
            scale,
            imported: false,
            carded: true,
            series: "Custom Upload",
            releaseYear: new Date().getFullYear(),
            wave: "Custom",
            vehicleType,
            featured: true,
            newArrival: true,
            popularity: 100,
            packagingType: "Standard Custom",
            color: "standard"
        };

        const currentData = [...productsData];
        currentData.unshift(newProduct); // Add to top so user sees it instantly

        const dataPath = path.join(process.cwd(), "lib", "data", "products.json");
        await fs.writeFile(dataPath, JSON.stringify(currentData, null, 2));

        return NextResponse.json({ success: true, slug });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}
