export async function getServerSideProps({ res }) {
       const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
         <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
           <url>
             <loc>https://x4-esports-official.vercel.app/</loc>
             <lastmod>${new Date().toISOString()}</lastmod>
           </url>
           <url>
             <loc>https://x4-esports-official.vercel.app/tournaments</loc>
             <lastmod>${new Date().toISOString()}</lastmod>
           </url>
           <url>
             <loc>https://x4-esports-official.vercel.app/leaderboard</loc>
             <lastmod>${new Date().toISOString()}</lastmod>
           </url>
         </urlset>
       `;

       res.setHeader('Content-Type', 'text/xml');
       res.write(sitemap);
       res.end();
       return { props: {} };
}
