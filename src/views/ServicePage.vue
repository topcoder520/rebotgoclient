<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>服务地址</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <van-contact-list add-text="添加服务地址" v-model="chosenContactId" :list="list" default-tag-text="默认" @add="onAdd"
        @edit="onEdit" @select="onSelect" />
    </ion-content>
  </ion-page>
</template>
  
<script>
import { defineComponent, ref,onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';

export default defineComponent({
  name: 'ServicePage',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton },
  setup() {
    const store = useStore();

    const router = useRouter();
    const chosenContactId = ref('0');
    const list = ref([]);

    const getServiceList = async () => {
      const listData = await store.dispatch('getServiceList', {});
      list.value = [];
      for (var i = 0; i < listData.length; i++) {
        const item = listData[i];
        if (item.IsShow > 0) {
          chosenContactId.value = item.Id;
        }
        list.value.push({
          id: item.Id,
          name: item.ConfigName,
          tel: item.ServerAddress,
          isDefault: item.IsShow > 0 ? true : false,
        });
      }
    };
    getServiceList();

    onUpdated(()=>{
      console.log('onUpdated');
      getServiceList();
    });

    const onAdd = () => {
      router.push({
        path: '/addservice',
        query: { Id: 0 }
      });
    }
    const onEdit = (contact) => {
      router.push({
        path: '/addservice',
        query: { Id: contact.id }
      });
    };
    const onSelect = (contact) => {
      for (let i = 0; i < list.value.length; i++) {
        const item = list.value[i];
        if (item.id == contact.id) {
          item.isDefault = true;
        } else {
          item.isDefault = false;
        }
        store.dispatch('chosenService', {
          Id: item.id,
          IsShow: item.isDefault ? 1 : 0
        });
        store.commit('setBaseUrl',contact.tel);
      }
      //router.replace({ path: '/tabs/tab3' })
      router.back();
    };

    return {
      list,
      onAdd,
      onEdit,
      onSelect,
      chosenContactId,
    };
  },
})
</script>
<style>
.van-button--danger {
  background: #3880ff !important;
  border: 1px solid #3880ff;
}

.van-tag--danger {
  background: #3880ff !important;
}

.van-contact-list__radio .van-radio__icon--checked .van-icon {
  background: #3880ff !important;
  border-color: #3880ff !important;
}
</style>
  