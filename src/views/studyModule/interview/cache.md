// 参考文章https://juejin.cn/post/7127194919235485733

web 缓存 -> 浏览器缓存和 http 缓存
浏览器缓存: 常见的有 localStorage、sessionStorage 和 cookie.
localStorage 和 sessionStorage 的存储大小为 5M 左右, 且只能存储字符串类型的数据. cookie 只有 4kb 左右.
localStorage 为长效缓存,如果不去手动清除它就会一直存在.
sessionStorage 为窗口缓存,只要当前窗口关闭,缓存就会被自动清除.不能进行跨页面通讯,因为它的生命周期是基于浏览器页面的. 若想要两个页面间互相通讯, 放在同一个页面下的 iframe 中.
...Storage.clear(): 清除方法

http 缓存: 强缓存和协商缓存(有哈希值的文件设置强缓存,否则协商缓存)
强缓存: 基于 cache-control: 在资源的响应标头上设置缓存多久(s):
res.writeHead(200, {
'Cache-Control': 'max-age=10' -> 从该资源第一次返回开始,之后的 10s 内若是再次请求该资源,从缓存中返回.
})
Expires: 过度依赖本地时间
cache-control 的六个属性: 多个值同时使用时用,分割:

1. max-age: 决定客户端资源被缓存多久.
2. s-maxage: 决定代理服务器缓存的时长.
3. no-cache: 跳过强缓存的校验,直接去服务器进行协商缓存.
4. no-store: 禁止任何缓存策略.
5. public: 资源既可以被浏览器缓存也可以被代理服务器缓存.
6. private: 资源只能被服务器缓存. // 默认值

协商缓存:
基于 last-modified 的协商缓存实现方式是:

1. 首先需要在服务器端读出文件修改时间，
2. 将读出来的修改时间赋给响应头的 last-modified 字段。
3. 最后设置 Cache-control:no-cache.
   当客户端读取到 last-modified 的时候，会在下次的请求标头中携带一个字段:If-Modified-Since,
   该字段就是服务器第一次修改赋值的时间.
   之后每次对该资源的请求都会带上 If-Modified-Since 字段,根据该字段是否一致来判断是否返回新的 last-modified.

etag: 文件指纹
第一次请求某资源时,计算出文件指纹并放在 etag 字段中跟资源一起返回.
第二次请求时比对该指纹,若完全吻合,直接返回 304 状态码和一个空响应体.
否则重新生成文件指纹并存储到响应体的 etag 中.
etag 分为强验证和弱验证: 弱验证只抽取部分文件属性来生成哈希值,准确度不如强验证.

从内存读取的缓存比从磁盘读取的缓存更快.
所有带 304 的资源都是协商缓存,所有标注(从内存/磁盘读取)的资源都是强缓存.
