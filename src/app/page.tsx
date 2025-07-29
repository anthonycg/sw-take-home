"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const loadImages = useCallback(() => {
        fetch("http://localhost:3001/images")
            .then((res) => res.json())
            .then((res) => {
                setImageUrls(res);
            })
            .catch(console.error);
    }, []);

    const uploadImage = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (!file) {
                return;
            }

            const fileName = file.name;

            await fetch("http://localhost:3001/upload", {
                method: "POST",
                headers: {
                    "Content-Type": file.type,
                    "x-file-name": fileName,
                },
                body: file,
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP err, STATUS: ${res.status}`);
                    }
                })
                .then((res) => {
                    loadImages();
                    console.log(res);
                })
                .catch((error) => console.log(`Error: ${error}`));
        },
        [loadImages]
    );

    const deleteImage = useCallback(
        async (url: string) => {
            const splitKeys = url.split("amazonaws.com/");
            const key = splitKeys[splitKeys.length - 1];
            await fetch("http://localhost:3001/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ key }),
            })
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP err, STATUS: ${res.status}`);
                    }
                    return await res.text();
                })
                .then((res) => {
                    loadImages();
                    console.log(res);
                })
                .catch((error) => console.log(`Error: ${error}`));
        },
        [loadImages]
    );

    useEffect(() => {
        fetch("http://localhost:3001/images")
            .then((res) => res.json())
            .then((res) => {
                setImageUrls(res);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="font-sans bg-slate-100 min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-black mb-8">
                    Image Gallery
                </h1>
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 text-black rounded-md px-4 py-2 w-full max-w-md"
                    />
                    <label className="ml-4">
                        <span className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">
                            Upload
                        </span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="fileUpload"
                            name="upload"
                            onChange={(e) => uploadImage(e)}
                        />
                    </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {imageUrls.map((url, i) =>
                        url ? (
                            <div
                                key={i}
                                className="relative bg-white shadow-md rounded-md overflow-hidden"
                            >
                                <button
                                    onClick={() => deleteImage(url)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                >
                                    &times;
                                </button>
                                <Image
                                    src={url}
                                    alt="Uploaded image"
                                    width={200}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                    unoptimized
                                    priority
                                />
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
}
