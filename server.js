const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const tweetsRouter = require('./routes/tweets');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// 路由
app.use('/api/tweets', tweetsRouter);

// 提供前端页面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/tweet/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'detail.html'));
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 