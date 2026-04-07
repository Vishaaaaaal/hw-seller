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

        const listPrice = isNaN(priceRaw) ? 0 : priceRaw;
        const slug = title.toLowerCase().replace(/[\s\W-]+/g, "-");

        // Write image if provided
        if (imageFile && imageFile.name) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const ext = path.extname(imageFile.name) || ".jpg";
            const fileName = `${slug}${ext}`;
            const filePath = path.join(process.cwd(), "public", "images", "products", fileName);
            try {
                await fs.writeFile(filePath, buffer);
            } catch (err: unknown) {
                const code = (err as NodeJS.ErrnoException).code;
                if (code === "EROFS" || code === "ENOENT") {
                    return NextResponse.json(
                        { error: "Image uploads are not supported in this deployment environment. Use a local dev server to add listings." },
                        { status: 501 }
                    );
                }
                throw err;
            }
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
            color: "standard",
        };

        const currentData = [...productsData];
        currentData.unshift(newProduct);

        const dataPath = path.join(process.cwd(), "lib", "data", "products.json");
        try {
            await fs.writeFile(dataPath, JSON.stringify(currentData, null, 2));
        } catch (err: unknown) {
            const code = (err as NodeJS.ErrnoException).code;
            if (code === "EROFS" || code === "ENOENT") {
                return NextResponse.json(
                    { error: "Product data cannot be persisted in this deployment environment. Use a local dev server to add listings." },
                    { status: 501 }
                );
            }
            throw err;
        }

        return NextResponse.json({ success: true, slug });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}
