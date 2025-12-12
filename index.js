export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.split("/").filter(Boolean);
    const method = request.method;

    // URL format:
    // https://your-backend.com/post?webhook=WEBHOOK_URL&json=BASE64

    // Handle post request
    if (path[0] && method === "GET") {
      const webhook = url.searchParams.get("webhook");
      const encodedJson = url.searchParams.get("json");
      const Method = path[0].toUpperCase();
      
      if (!webhook || !encodedJson) {
        return new Response("Missing webhook or json", { status: 400 });
      }

      let json;
      try {
        const decoded = atob(encodedJson);
        json = JSON.parse(decoded);
      } catch (e) {
        return new Response("Invalid Base64 JSON", { status: 400 });
      }

      const resp = await fetch(webhook, {
        method: Method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json)
      });
      return new Response(await resp.text());
    }
    
    return new Response("404 Not Found", { status: 404 });
  }
};
