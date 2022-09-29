<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent,onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup(){
    const store = useStore();

    const setBaseUrl = async ()=>{
      await store.dispatch('getServiceById', 0).then((resolve) => {
                const data = resolve;
                console.log('baseUrl:');
                console.log(JSON.stringify(data));
                store.commit('setBaseUrl',data.ServerAddress);
            }).catch((reject) => {
                console.log('查询服务失败：' + reject);
            });
    };

    onMounted(() => {
      store.dispatch('startupDatabase').then(() => {
        console.log('数据库初始化成功');
        setBaseUrl();
      }).catch((reject) => {
        console.log('startupDatabase-err=>' + reject);
      });
    });
  },
});
</script>