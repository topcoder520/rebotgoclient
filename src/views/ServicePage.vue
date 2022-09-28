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
      <van-contact-list add-text="添加服务地址" v-model="chosenContactId" :list="list" default-tag-text="default" @add="onAdd" @edit="onEdit"
        @select="onSelect" />
    </ion-content>
  </ion-page>
</template>
  
<script>
import { defineComponent,ref } from 'vue';
import { Toast } from 'vant';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';

export default defineComponent({
  name: 'ServicePage',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton },
  setup() {
    const chosenContactId = ref('1');
    const list = ref([
      {
        id: '1',
        name: 'John Snow',
        tel: '13000000000',
        isDefault: true,
      },
      {
        id: '2',
        name: 'Ned Stark',
        tel: '1310000000',
      },
    ]);

    const onAdd = () => Toast('Add');
    const onEdit = (contact) => Toast('Edit' + contact.id);
    const onSelect = (contact) => Toast('Select' + contact.id);

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
  .van-button--danger{
    background: #3880ff !important;
    border: 1px solid #3880ff;
  }
  .van-tag--danger{
    background: #3880ff !important;
  }
  .van-contact-list__radio .van-radio__icon--checked .van-icon{
    background: #3880ff !important;
    border-color:#3880ff !important;
  }
</style>
  