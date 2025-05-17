export async function analyzeProfile(formData: FormData) {
  const response = await fetch("http://localhost:8000/v1/analyze", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to analyze profile")
  }

  return response.json()
}
