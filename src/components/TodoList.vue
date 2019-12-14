<template>
  <div class="container">
    <form @submit.prevent="addItem(newItemName)" class="item-adding-form">
      <MdField>
        <label>Item Name</label>
        <MdInput maxlength="85" v-model="newItemName" />
      </MdField>
    </form>

    <div class="columns">
      <MdTabs md-sync-route class="md-primary">
        <MdTab md-label="In Progress" to="/todo/in-progress">
          <div class="column">
            <ul>
              <transition-group name="fade">
                <li is="TodoListItem"
                    v-for="item in unselectedItems"
                    :key="item.id"
                    :item="item"
                    @select="saveItemsToLocalStorage(items)"
                    @delete="deleteItem(item.id)"></li>

                <li key="-1" v-if="!unselectedItems.length">
                  No items.
                </li>
              </transition-group>
            </ul>
          </div>
        </MdTab>

        <MdTab md-label="Completed" to="/todo/completed">
          <div class="column">
            <ul>
              <transition-group name="fade">
                <li is="TodoListItem"
                    v-for="item in selectedItems"
                    :key="item.id"
                    :item="item"
                    @select="saveItemsToLocalStorage(items)"
                    @delete="deleteItem(item.id)"></li>
              </transition-group>

              <li key="-1" v-if="!selectedItems.length">
                No items.
              </li>
            </ul>
          </div>
        </MdTab>
      </MdTabs>
    </div>
  </div>
</template>

<script>

  import TodoListItem from './TodoListItem';

  export default {
    name: "TodoList",
    components: {
      TodoListItem,
    },
    created() {
      try {
        this.items = JSON.parse(localStorage.getItem('items'));
        if (!(this.items instanceof Array)) {
          throw new Error();
        }
      } catch {
        this.items = [];
      }
    },
    data: () => {
      return {
        items: [],
        newItemName: '',
      };
    },
    methods: {
      addItem(name) {
        if (!name) return;

        const itemsLength = this.items.length;
        const lastItem = this.items[itemsLength - 1];

        this.items.push({ name, id: lastItem ? lastItem.id + 1 : 1, selected: false, });
        this.newItemName = '';

        if (this.$route.path !== '/todo/in-progress') {
          this.$router.push('/todo/in-progress');
        }
      },
      saveItemsToLocalStorage(items) {
        localStorage.setItem('items', JSON.stringify(items));
      },
      deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
      }
    },
    computed: {
      selectedItems() {
        return this.items.filter(item => item.selected)
      },
      unselectedItems() {
        return this.items.filter(item => !item.selected)
      },
    },
    watch: {
      items: (newValue) => {
        this.saveItemsToLocalStorage(newValue);
      }
    },
  }
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
    padding: 0;
  }

  .item-adding-form {
    width: 100%;

    input {
      width: 100%;
    }
  }

  .columns {
    display: flex;
    flex-flow: column wrap;

    .column {
      width: 100%;
      position: relative;
    }
  }
</style>