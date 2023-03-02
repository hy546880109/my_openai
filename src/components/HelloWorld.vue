<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <input type="text" placeholder="请输入你的问题" v-model="myInput" />
    <button @click="getOpenAi">提交</button>
    <h2>{{ myInput }}</h2>

    <hr />
    <!--这个标签的涵义就是一条水平的直线，但是不灵活，现在基本没人使用！-->
    <textarea name="re" id="ai" cols="150" rows="10" v-model="messages"></textarea>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      myInput: "",
      messages: "",
    };
  },
  methods: {
    showInputValue() {
      console.log(this.myInput);
      return this.myInput;
    },
    async getOpenAi() {
      // 解构赋值
      const {data: res} = await axios({
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {"Content-Type": "application/json", "Authorization": "Bearer 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"},
        data: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Hello!" }],
        },
      });
      let messages = res.choices[0]['message']['content'];
      console.log(messages);
      return messages
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
