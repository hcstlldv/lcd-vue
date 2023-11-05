<template>
  <main>
    <header>
      <input
        v-model="organizationToSearch"
        placeholder="Enter organization name"
      />
      <button @click="($event) => searchOrganization(organizationToSearch)">
        Search
      </button>
    </header>
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
    fetchMembers(organizationName) {
      const url = `https://api.github.com/orgs/${organizationName}/members`;
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
    searchOrganization(organizationToSearch) {
      if (!organizationToSearch) return;
      this.fetchMembers(organizationToSearch);
    },
  },
  data() {
    return {
      members: [],
      organizationToSearch: "lemoncode",
    };
  },
  watch: {
    organization(newOrganization, oldOrganization) {
      if (newOrganization !== oldOrganization) {
        this.fetchMembers(newOrganization);
      }
    },
  },

  mounted() {
    this.fetchMembers(this.organization);
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

header {
  margin: 20px 0;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

header input {
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid rgba(27, 31, 35, 0.15);
  caret-color: #64b687;
  accent-color: #64b687;
  outline-color: #64b687;
}

header button {
  caret-color: #64b687;
  accent-color: #64b687;
  appearance: none;
  background-color: #64b687;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 4px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

header button:hover {
  background-color: #2c974b;
}
</style>
