/**
 * 连接mysql-pines的node后端，引入链接池方式（链接池：https://blog.csdn.net/weixin_48255917/article/details/118973879）
 * 作者：Alla
 * 备注：这是.js文件的原因是mysql插件是js类的，如果使用.ts将因为js文件具有any隐式类型而无法识别，总之很麻烦...
 */
// 服务器接口需要的api
import Express from "express"
import Mysql from 'mysql' 

const exp = Express() //创建实例
const mydatabase = Mysql.createConnection({
  host: '127.0.0.2',
  user: 'root',
  password : '123456',
  database: 'pines',
  connectionLimit: 10, // "指定连接池中最大的链接数，默认是10",
  queueLimit: 10, // "指定允许挂起的最大连接数，如果挂起的连接数超过该数值，就会立刻抛出错误，默认属性值为0，代表不允许被挂起的最大连接数"
  multipleStatements: true //是否允许多条语句查询，一般允许
})

// 设置允许跨域访问
exp.all('*',function(req,res,next){ 
  //TODO：限制允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Content-Type", "application/json;charset=utf-8"); //允许的header类型
  // 设置请求头中允许携带的参数
  res.header("Access-Control-Allow-Headers", "Content-Type,request-origin"); 
  // 允许客户端携带证书式访问。保持跨域请求中的Cookie。注意：此处设true时，Access-Control-Allow-Origin的值不能为 '*'
  res.header("Access-Control-Allow-Credentials", "true"); 
  res.header("Access-control-max-age", 1000); 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式 
  next();
})

// 连接数据库
mydatabase.connect(err => {
    console.log(err,'注：null则为连接成功')
})
exp.listen(4000, () => {
    console.log('服务器在4000端口已开启')
})


/**
 * 查询操作!是函数！!-每次取一页
 * @arg:（来自于前端的req）
 *  OneKindFlag：搜寻特定类别，初始值为false，在使用搜索框时采用true
 *  kindLabel：搜寻的类别，初值为null
 *  kindItem：搜寻的类别的内容，初值为null，字符串 - '王大锤','李四'
 *  pageIndex: 本页页数，初值为1，即返回第一页的数据
 *  pageLen: 一页的记录数
 *  SortFlag: 是否需要排序，初始值为false
 *  sortDirection: 当SortFlag为true时，它的true为从小到大，false相反，初始值为true
 * @return: 
 *  pinesData: 想查询的数据 - 通过axios接收
 *  total_num: 数据记录条数，即len(result)
 */
//let OneKindFlag = false // 测试用
exp.get('/searchFromPines',(req,res) => {
    const start = (req.query.pageIndex-1)*req.query.pageLen 
    const num = req.query.pageLen // 取一页的数据
    if(req.query.OneKindFlag===false){
        let sqlStr = "SELECT * FROM pines LIMIT "+start+","+num+";"
        mydatabase.query(sqlStr,(err,result,fields)=>{
            if(err){
                console.log(err,'如果为null，sql语句执行成功')
                return
            }
            // 不设置响应头Head，中文会乱码
            // 200参数1三位数http状态码，参数2可选，参数3表示数据的类型
            res.writeHead(200,{'Content-type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(result)) //end只能接字符串，所以转换
            
            return len(result)
            //console.log(fields)
        })
    }
    //TODO：排序
    else{ //进行分类
        let sqlStr = "SELECT * FROM pines WHERE "+req.query.kindLabel+"in ("+req.query.kindItem+") LIMIT "+start+","+num+";"
        mydatabase.query(sqlStr,(err,result,fields)=>{
            if(err){
                console.log(err,'如果为null，sql语句执行成功')
                return
            }
            //TODO：传入缓存服务器？链接池
            res.writeHead(200,{'Content-type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(result)) 
            return len(result)
        })
    }
    //return {pinesData: pinesData, total_num: total_num}
})



/**
 * 插入操作
 * @arg:
 *  req：字符串记录，即 1,'A',.... 之类，无括号、中括号等符号
 *  res：字符串结果，该操作结果，初始值为'插入失败'
 * @return:
 *  res：字符串结果，格式不正确是“格式错误，插入失败”
 */
exp.get('/insertIntoPines',(req,res) => {
    let sqlStr =  "INSERT INTO pines VALUES("+req+");"
    //TODO：格式错误会直接不允许插入 - axis处
    //执行mysql 语句
    mydatabase.query(sqlStr,(err)=>{
        console.log(err,'如果为null，sql语句执行成功')
        if(err!=null){
            return res
        }
    })
    res = '插入成功'
    //成功后的页面显示
    return res
})


/**删除操作-通过id删除
 * @arg:
 *  id：唯一的标识符
 */
exp.get('/deletePine',(req,res) => {
    let sqlStr = 'DELETE FROM pines WHERE id=?'
    mydatabase.query(sqlStr,[req.query.id],(err,result)=>{
        if(err){
            console.log(err,'如果为null，sql语句执行成功')
        }
        if(result.affectedRows > 0 ){
            result.send({
                status: 200,
                message: '删除成功'
            })
        }
        else{
            result.send({
                status: 202,
                message: '删除失败'
            })
        }
    })
})


/**修改操作
 * @arg:
 *  id：唯一的标识符
 */
exp.get('/modifyPine',(req,res) => {
    //TODO：如果修改了未知处
    let sqlStr = "UPDATE pines SET ?=?"
    mydatabase.query(sqlStr,[],(err,result) => {
        if(err){
            console.log(err,'如果为null，sql语句执行成功')
        }
        if(result.changedRows > 0 ){
            result.send({
                status: 200,
                message: '修改成功'
            })
        }
        else{
            result.send({
                status: 202,
                message: '修改失败'
            })
        }
    })
})

/**查询操作-一次查所有的！用于地图！
 * @arg:
 *  latitude_x1：左上角点的纬度
 *  longitude_y1：左上角点的经度
 *  latitude_x2：右下角的纬度
 *  longitude_y2：右下角的经度
*/
exp.get('/searchPinesLocation',function(req,res){
    let sqlStr = ""
    mydatabase.query(sqlStr,
        [req.query.latitude_x1,req.query.latitude_y1],(err,result)=>{
            if(err){
                console.log(err,'如果为null，sql语句执行成功')
                return 
            }
            res.writeHead(200,{'Content-type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(result)) //end只能接字符串，所以转换
            
            return len(result)
    })
})