<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <input type="text" id="input" placeholder="请输入你的问题" v-model="myInput" />
      <button @click="getOpenAi">提交</button>
    </div>
    <div id="my_css">
      <h2 id="my">{{ myInput }}</h2>
    </div>
    <!-- <h2>{{ messages }}</h2> -->
    <hr />
    <!--这个标签的涵义就是一条水平的直线，但是不灵活，现在基本没人使用！-->
    <textarea name="re" id="ai" cols="150" rows="10" v-model="messages.name"></textarea>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      myInput: "",
      messages: "",
      ai_key: "",
    };
  },
  methods: {
    showInputValue() {
      console.log(this.myInput);
      return this.myInput;
    },

    async getOpenAi() {
      // 解构赋值

      console.log(this.ai_key)
      const { data: res } = await axios({
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.ai_key}`,
        },
        data: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Hello!" }],
        },
      });
      var mes = res.choices[0]["message"]["content"];
      console.log(mes);
      return mes;
    },

    readjson() {
      axios.get('/ai_key.json').then(res => {
        this.ai_key = res.data.key
        console.log(this.key)//此处的res对象包含了json的文件信息和数据，我们需要的json数据存在于key属性中
        return res
      },
      )
    }

    // async getApi() {
    //   const { data: res } = await axios({
    //     method: "GET",
    //     url: 'http://127.0.0.1:8000',
    //   });
    //   console.log(res)
    //   this.messages = res
    //   return res
    // }
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 40px 0 0;
}

#input {
  width: 300px;
  height: 40px;
}

#my_css {
  width: 500px;
  height: 200px;
  margin: 0 auto;
  overflow: auto;
}

#my {
  background-color: rgb(120, 120, 219);
  text-align: center;

}

#ai {
  background-color: black;
  font-family: "微软雅黑";
  color: #42b983;
  Font-size: 20px;
}
</style>
