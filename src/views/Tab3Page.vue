<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>设置</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="settings">
        <van-cell-group>
          <van-cell :title="title" :value="value" is-link to="/service" />
        </van-cell-group>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent,ref,onUpdated } from 'vue';
import { Toast} from 'vant';
import { useStore } from 'vuex';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, },
  setup() {
    const store = useStore();

    const title = ref('服务名称');
    const value = ref('服务地址');

    const getServiceDetail = async (DetailId) => {
      await store.dispatch('getServiceById', DetailId).then((resolve) => {
        const data = resolve;
        if(data.Id>0){
          title.value = data.ConfigName;
          value.value = data.ServerAddress;
        }
        console.log(JSON.stringify(data));
      }).catch((reject) => {
        console.log('查询服务失败：' + reject);
        Toast.fail('查询服务失败：' + reject);
      });
    };
    getServiceDetail(0);

    onUpdated(function(){
      getServiceDetail(0);
    });

    return {
      title,
      value
    };
  },
});
</script>
<style scoped>
#settings {
  height: 100%;
  width: 100%;
  background: #efefef;
}

.van-cell {
  border: 1px solid #eee;
}
</style>