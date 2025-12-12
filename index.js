export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.split("/").filter(Boolean);
    const method = request.method;

    // URL format:
    // https://your-backend.com/post?domain=URL&content=Hello

    // Handle post request
    if (path[0] === "post" && method === "GET") {
      const domain = url.searchParams.get("domain");
      const content = url.searchParams.get("content");

      if (!domain || !content) {
        return new Response("Missing domain or content", { status: 400 });
      }

      const Request = await fetch(domain, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
      });
      const text = await Request.text();
      return new Response(text);
    }

    return new Response("404 Not Found", { status: 404 });
  }
};
