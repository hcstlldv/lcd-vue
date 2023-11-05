<template>
  <main>
    <section v-if="members.length">
      <article
        v-for="member in members"
        :key="member.id"
        @click="($event) => selectMember(member)"
      >
        <img :src="member.avatar_url" :alt="member.login" />
        <p>{{ member.login }}</p>
      </article>
    </section>
    <div v-else>
      <p>No members found.</p>
    </div>
  </main>
</template>

<script>
export default {
  name: "MembersList",
  props: {
    organization: String,
  },
  methods: {
    fetchMembers() {
      const url = `https://api.github.com/orgs/${this.organization}/members`;
      fetch(url)
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Networks is not working");
        })
        .then((response) => {
          this.members = response;
        })
        .catch((error) => {
          console.error(error);
          this.members = [];
        });
    },
    selectMember() {
      // TODO redirect to detail
    },
  },
  data() {
    return {
      members: [],
    };
  },
  watch: {
    organization(newOrganization, oldOrganization) {
      if (newOrganization !== oldOrganization) {
        this.fetchMembers();
      }
    },
  },

  mounted() {
    this.fetchMembers();
  },
};
</script>

<style scoped>
main {
  padding: 20px;
}
section {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

article {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}
article:hover {
  background-color: #c3f3c0;
}

article img {
  width: 50px;
  height: 50px;
}

article p {
  font-size: 14px;
  margin: 0;
  text-transform: uppercase;
}
</style>
