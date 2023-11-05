<template>
  <p>detail page</p>
</template>

<script>
export default {
  name: "MembersDetail",
  props: {
    login: String,
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
          console.log("🚀 ~ response:", response);
          this.member = response;
        });
    },
  },
};
</script>
