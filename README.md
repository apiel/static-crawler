# static-crawler

Use static-crawler to generate static html version of a single page application using React, VueJs or Angular. No matter of the framework you are using, this tool will work with most of them, since it is using puppeteer to render the pages.

```
npx static-crawler url [dist]
npx static-crawler http://127.0.0.1:3000/
```

By default it will generate the static files in a subfolder `site`. You can specify the destination folder as second parameter of static-crawler or by using the configutation file, `static-crawler.json`:

```
{
    "viewport": { "width": 800, "height": 600 },
    "userAgent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "browserTimeout": 10,
    "consumerCount": 5,
    "distFolder": "site",
    "ignorePattern": false
}
```

Static-crawler will crawl as well all the links found in the given url, till no new links are founds in the crawled pages. To skip crawling the children, for example to re-generate just one page instead of the all site, you can use `--skipLinks=true` parameter:

```
npx static-crawler http://127.0.0.1:3000/my/page --skipLinks=true
```

If you need to skip some page you can use the ignore pattern, base on [minimatch](https://github.com/isaacs/minimatch):

```
npx static-crawler http://127.0.0.1:3000/ --ignorePattern=*/page
```

