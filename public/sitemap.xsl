<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap - BookMeThat</title>
        <style>
          body { font-family: ui-sans-serif, system-ui, sans-serif; color: #2D3748; margin: 40px auto; max-width: 900px; line-height: 1.6; padding: 0 20px; background: #FAF9F6; }
          .container { background: #FFFFFF; border: 2px solid #E55B13; padding: 40px; box-shadow: 6px 6px 0px #E55B13; }
          h1 { font-family: Georgia, serif; color: #1A202C; border-bottom: 2px solid #E55B13; padding-bottom: 12px; margin-top: 0; font-style: italic; }
          p { color: #718096; font-size: 14px; margin-bottom: 20px; }
          .badge { background: rgba(229, 91, 19, 0.1); color: #E55B13; font-weight: bold; padding: 4px 10px; font-size: 12px; font-family: monospace; display: inline-block; margin-bottom: 10px; border: 1px solid rgba(229, 91, 19, 0.2); }
          table { width: 100%; border-collapse: collapse; margin-top: 25px; }
          th { background: #FAF9F6; border-bottom: 1px solid #E2E8F0; text-align: left; padding: 12px; font-weight: 700; font-size: 11px; color: #E55B13; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace; }
          td { border-bottom: 1px solid #E2E8F0; padding: 12px; font-size: 13px; word-break: break-all; }
          tr:hover td { background: #FAF9F6; }
          a { color: #E55B13; text-decoration: none; font-weight: 500; }
          a:hover { text-decoration: underline; }
          .priority { font-family: monospace; font-weight: bold; color: #1A202C; }
          .freq { font-family: monospace; color: #718096; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge">XML SITEMAP INDEX</div>
          <h1>BookMeThat™ Search Engine Sitemap</h1>
          <p>This is a standard XML Sitemap generated for search engine crawlers (Google, Bing, etc.) to discover and index all high-performing eSIM directories, car rental models, and topical guides on <strong>bookmethat.com</strong>.</p>
          <p>Total discovered crawl paths in this document: <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong> URLs</p>
          
          <table>
            <thead>
              <tr>
                <th style="width: 55%;">URL Location</th>
                <th style="width: 15%;">Last Modified</th>
                <th style="width: 15%;">Frequency</th>
                <th style="width: 15%;">Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td>
                    <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                  </td>
                  <td><xsl:value-of select="s:lastmod"/></td>
                  <td class="freq"><xsl:value-of select="s:changefreq"/></td>
                  <td class="priority"><xsl:value-of select="s:priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
