export default function Home() {
    return (<div className="font-sans bg-slate-500 min-h-screen p-8">
            <div>
                <input type="text" placeholder="Search"></input>
            </div>
            <label>
                Upload
                <input style={{ display: "none" }} type="file" id="fileUpload" name="upload"></input>
            </label>
        </div>);
}
