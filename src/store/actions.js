import {getNowDateString} from '@/util/date'

export function getServiceList(context){
    return new Promise((resolve,reject)=>{
        context.state.database.transaction(tx => {
            tx.executeSql(`select Id,ConfigName,ServerAddress,UserName,Password,Status,Token,CreateTime,IsShow,State from service where State = 1 order by Id desc`, [], (tx, res) => {
                var rowData = [];
                for (var x = 0; x < res.rows.length; x++) {
                    rowData.push(res.rows.item(x));
                }
                resolve(rowData)
            })
        }, function (error) {
            reject(error.message);
        }, function () {
            //console.log('transaction ok');
        })
    });
}

export function updateService(context,{
    Id,ConfigName,ServerAddress,IsShow
}){
    return new Promise((resolve, reject) => {
        context.state.database.transaction(function (tx) {
            var query = "update service set ConfigName=?,ServerAddress=?,IsShow=? where Id = ?";
            tx.executeSql(query, [ConfigName,ServerAddress,IsShow,Id], function (tx, res) {
                    //console.log("insertId: " + res.insertId + " -- probably 1");
                    //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                    resolve({rowsAffected:res.rowsAffected});
                },
                function (tx, error) {
                    console.log('UPDATE  error: ' + error.message);
                    reject('UPDATE  error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    });
}

export function chosenService(context,{
    Id,IsShow
}){
    return new Promise((resolve, reject) => {
        context.state.database.transaction(function (tx) {
            var query = "update service set IsShow=? where Id = ?";
            tx.executeSql(query, [IsShow,Id], function (tx, res) {
                    //console.log("insertId: " + res.insertId + " -- probably 1");
                    //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                    resolve({rowsAffected:res.rowsAffected});
                },
                function (tx, error) {
                    console.log('UPDATE  error: ' + error.message);
                    reject('UPDATE  error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    });
}

export function delService(context,id){
    return new Promise((resolve, reject) =>{
        context.state.database.transaction(function (tx) {
            var query = "update service set State = 0 WHERE id = ?";
            tx.executeSql(query, [id], function (tx, res) {
                    //console.log("removeId: " + res.insertId);
                    //console.log("rowsAffected: " + res.rowsAffected);
                    resolve({rowsAffected:res.rowsAffected});
                },
                function (tx, error) {
                    console.log('DELETE error: ' + error.message);
                    reject('DELETE  error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    });
}

export function addService(context,{
    ConfigName,ServerAddress,IsShow
}){
    return new Promise((resolve, reject) => {
        context.state.database.transaction(function (tx) {
            const CreateTime = getNowDateString();
            var query = "INSERT INTO service (ConfigName,ServerAddress,UserName,Password,Status,Token,CreateTime,IsShow,State) VALUES (?,?,?,?,?,?,?,?,?)";
            tx.executeSql(query, [ConfigName,ServerAddress,'','','','',CreateTime,IsShow,1], function (tx, res) {
                    //console.log("insertId: " + res.insertId + " -- probably 1");
                    //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                    resolve(res);
                },
                function (tx, error) {
                    console.log('INSERT error: ' + error.message);
                    reject('INSERT error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    });
}

export function getServiceById(context, id) {
    return new Promise((resolve, reject) => {
        context.state.database.transaction(tx => {
            var exsql = '';
            if(id == 0){
                exsql = ' or IsShow = 1';
            }
            tx.executeSql('select Id,ConfigName,ServerAddress,UserName,Password,Status,Token,CreateTime,IsShow,State from service where Id = ' + id+exsql, [], (tx, res) => {
                var rowData = {};
                for (var x = 0; x < res.rows.length; x++) {
                    rowData = res.rows.item(x);
                    break;
                }
                resolve(rowData)
            })
        }, function (error) {
            reject(error.message);
        }, function () {
            //console.log('transaction ok');
        })
    });
}

export function startupDatabase(context) {
    return new Promise((resolve, reject) => {
        document.addEventListener('deviceready', () => {
            const db = (window.cordova.platformId === 'browser') ?
                window.openDatabase('mouse_keyboard', '1.0', 'Data', 2 * 1024 * 1024) :
                window.sqlitePlugin.openDatabase({ name: 'mouse_keyboard.db', location: 'default'});
            context.commit('setDatabase', db);
            //???????????????
            db.transaction(function (tx) {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS "service" (
                                    "Id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                    "ConfigName" TEXT,
                                    "ServerAddress" TEXT,
                                    "UserName" TEXT,
                                    "Password" text,
                                    "Status" text,
                                    "Token" text,
                                    "CreateTime" text,
                                    "IsShow" integer,
                                    "State" integer
                                )`, [], (tx, res) => {
                                    resolve(res);
                            if(res.rowsAffected>0){
                                // tx.executeSql(`INSERT INTO note ("Title", "Category", "Content", "CreateTime", "State", "Year", "Month", "Day","Sort","Timestamp")
                                //     VALUES
                                //         ('????????????', '????????????', '????????????', '2022???6???17??? 14:08', 1,2022, 6, 17,1,1)`);
                            }
                });
            }, function (error) {
                console.log('transaction error: ' + error.message);
                reject('transaction error: ' + error.message);
            }, function () {
                console.log('resolve transaction ok');
            });
            //???????????????
            db.transaction(function (tx) {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS "note_version" (
                                    "Id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                    "Version" TEXT,
                                    "Timestamp" integer,
                                    "Des" text,
                                    "CreateTime" text,
                                    "Info1" TEXT,
                                    "Info2" TEXT,
                                    "Info3" TEXT,
                                    "State" integer
                                )`, [], (tx, res) => {
                                    resolve(res);
                            if(res.rowsAffected>0){
                                tx.executeSql(`INSERT INTO note ("Version", "Timestamp", "Des", "CreateTime", "Info1", "Info2", "Info3","State")
                                    VALUES
                                        ('0.0.1', ${Date.now()}, '????????????','${getNowDateString()}','','', '', '',1)`);
                            }
                });
            }, function (error) {
                console.log('transaction error: ' + error.message);
                reject('transaction error: ' + error.message);
            }, function () {
                console.log('resolve transaction ok');
            });
        });
    });
}