export default function DownloadWhitepaperForm() {
  return (
    <section id="download-whitepaper">
      <h2>Download Whitepaper</h2>
      <form>
        <input placeholder="Email" />
        <select>
          <option>Select EMR</option>
        </select>
        <select>
          <option>Select Role</option>
        </select>
        <input placeholder="Company" />
        <button type="submit">Download</button>
      </form>
    </section>
  );
} 