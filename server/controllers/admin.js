const path = require('path');
const fs = require('fs');
const md = require('markdown-it')();

exports.page = function(req, res) {
  const options = {
  	root: __dirname + '../../../public/views/'
  }
  res.sendFile('admin.html', options);
}

exports.edit = function(req, res) {
  const title = req.body.title;
  const post = req.body.post;

  console.log('文章标题：' + title);
  console.log('提交的文章：' + post);

  const content = md.render(post);

  console.log('准备写入文件')

  fs.writeFile(`${title}.md`, content, err => {
  	if (err) return console.log(err);
  	console.log("数据写入成功！");
  })

  res.send('<h1>发表成功!</h1>')
}