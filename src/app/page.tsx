"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/images")
            .then((res) => res.json())
            .then((res) => {
                setImageUrls(res);
                console.log(res);
            })
            .catch(console.error);
    }, []);

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) {
            return;
        }

        const fileName = file.name;

        fetch("http://localhost:3001/upload", {
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
                console.log(res.json);
            })
            .then((res) => console.log(res))
            .catch((error) => console.log(`Error: ${error}`));
    };
    return (
        <div className="font-sans bg-slate-500 min-h-screen p-8">
            <button>Test</button>
            <div>
                <input type="text" placeholder="Search"></input>
            </div>
            <label>
                {/* TODO: Add upload success msg */}
                Upload
                <input
                    style={{ display: "none" }}
                    type="file"
                    id="fileUpload"
                    name="upload"
                    onChange={(e) => uploadImage(e)}
                ></input>
            </label>
            {imageUrls.map((url, i) =>
                url ? (
                    <Image
                        key={i}
                        src={url}
                        alt="Uploaded image"
                        width={80}
                        height={80}
                        unoptimized
                        priority
                    />
                ) : null
            )}
        </div>
    );
}
