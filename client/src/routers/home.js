import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

const input = `# 关于 XML 的几个概念

1.xml 语言没有预定义标签，而 html 中的标签都是预定义的。

2.xml 被设计用来传输和存储数据，其焦点是数据的内容。而 html 被设计用来显示数据，其焦点是数据的外观。

3.一句话描述 xml ：xml 是独立于硬件与软件的信息传输工具。

4.xml 文档必须包含根元素。第一行是 xml 声明，包含版本号，编码。



5.xml 中，所有元素都必须有关闭标签。

6.xml 中，空格会被保留。

7.xml 以 LF 存储换行。



8.xml 元素指的是从（且包括）开始标签直到（且包括）结束标签的部分，可以包括：其他元素、文本、属性或混合以上所有。

9.仅仅使用属性来提供与数据无关的信息。`

export default class Home extends Component {
	render() {
		return (
			<ReactMarkdown source={input} />
		);
	}
}
	