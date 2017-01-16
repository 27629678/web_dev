### 0x01 待完善的功能点



### 0x02 已完成的功能点

#### 1.1 favicon.ico

添加favicon.ico支持，用于显示标题左侧的icon，通过引入「serve-favicon」模块支持；

```
let app = express();
let path = require('path');
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
```