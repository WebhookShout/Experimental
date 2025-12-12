export default {
  async fetch(request) {
    const url = new URL(request.url);
    const domain = url.origin; // get service full link
    const path = url.pathname.split("/").filter(Boolean);
    const method = request.method;
    const ip = request.headers.get("CF-Connecting-IP") || "Unknown";

    if (path[0] === "post" && path[1] && method === "GET") {
      return new Response('Hello', {
        headers: { "Content-Type": "text/plain" }
      });
    }
    
    return new Response("404: Not found", { status: 404 });
  }
};
