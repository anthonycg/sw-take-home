"use client";
export default function Home() {
    const test = () => {
        fetch("http://localhost:3001/test")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP err, STATUS: ${res.status}`);
                }
                return res.text();
            })
            .then((res) => console.log(res))
            .catch((error) => console.log(`Error: ${error}`));
    };
    return (
        <div className="font-sans bg-slate-500 min-h-screen p-8">
            <button onClick={test}>Test</button>
            <div>
                <input type="text" placeholder="Search"></input>
            </div>
            <label>
                Upload
                <input
                    style={{ display: "none" }}
                    type="file"
                    id="fileUpload"
                    name="upload"
                ></input>
            </label>
        </div>
    );
}
