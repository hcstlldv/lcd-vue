<template>
  <article v-if="member">
    <section>
      <img :src="member.avatar_url" :alt="member.login" />
    </section>
    <body>
      <h1 v-if="member.name">{{ member.name }}</h1>
      <h2 v-if="organization">{{ organization }}</h2>
      <p v-if="member.bio">{{ member.bio }}</p>
      <p v-if="member.email">{{ member.email }}</p>
    </body>
  </article>
  <p v-else>Member not found</p>
</template>

<script>
export default {
  name: "MembersDetail",
  props: {
    login: String,
    organization: String,
  },
  data() {
    return {
      member: null,
    };
  },
  methods: {
    fetchMember() {
      const url = `https://api.github.com/users/${this.login}`;
      fetch(url)
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Network is not working");
        })
        .then((response) => {
          this.member = response;
        })
        .catch((error) => {
          console.error(error);
          this.member = null;
        });
    },
  },
  mounted() {
    this.fetchMember();
  },
};
</script>

<style scoped>
article {
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}

body {
  flex: 1;
}

img {
  height: 200px;
  width: 200px;
}

h1,
h2,
p {
  margin: 0;
}
</style>
