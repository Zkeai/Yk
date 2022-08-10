/*
 * @Author: L.柠
 * @Date: 2022-08-10 21:18:01
 */
var url ="https://backend.lemox.club/api/"
var res = http.postJson(url+"user/searchUUID", {
    "uuid": 1993738334,
    "remark":"雷电-1",
    "model":"352746023870084"
});
var html = res.body.string();
var html = JSON.parse(html);
data = html.data;
console.log(html)