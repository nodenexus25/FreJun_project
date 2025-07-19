export function exportToCSV(comments) {
  const headers = ["id", "name", "email", "body"];
  const csvRows = [
    headers.join(","),
    ...comments.map((c) =>
      headers.map((h) => `"${(c[h] || "").replace(/"/g, '""')}"`).join(",")
    ),
  ];

  const csvBlob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(csvBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "comments.csv";
  a.click();
  URL.revokeObjectURL(url);
}
