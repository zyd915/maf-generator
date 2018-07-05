const date_ = require('../lib/util/date_');

module.exports = {
    datasource: {
        db_type : 'mysql',
        user: 'root', // 用户名
        password: '*****', // 密码
        database: 'maf-myproject', // 数据库
        host: '127.0.0.1', // host
        port: 3306, // 端口
        connectionLimit: 1,
        multipleStatements: true,
        logger: console.log.bind(console),
        logConnect: true,
        logSql: true,
    },
    authorInfo: {
        author: 'yd',
        timestamp: date_.datetime(),
        copyright: 'Copyright © 2017 - 2018 Herier.All Rights Reserved'
    },
    strategy: {
        fileOverridable: false,
        camelCase: false,
        project: '',
        module: 'admin',
        paramKey:[
            {
                key: 'module',
                dynamic: true,
                value: function () {
                    return '';
                },
            },
            {
                key: 'submodule',
                dynamic: true,
                value: function () {
                    return '';
                },
            },
            {
                key: 'entitykey',
                dynamic: true,
                value: function () {
                    return '';
                },
            },
            {
                key: 'table',
                dynamic: true,
                value: function () {
                    return '';
                },
            },
            {
                key: 'model',
                dynamic: false,
                value: 'model',
            },
            {
                key: 'service',
                dynamic: false,
                value: 'service',
            },
            {
                key: 'controller',
                dynamic: false,
                value: 'controller',
            },
        ],
        tableConfig:{
            prefix: 't_',
            projectSplit: false,
            moduleSplit: true,
            separator: '_',
        },
        generateTable: {
            tablePrefix : 't_',
            includes: [
                't_goods_equip'
                // 't_comm_area',
            ],
            excludes: [
            ],
        },
    },
    template_config : {
        engine: {
            autoescape: true,
            trimBlocks: false,
            lstripBlocks: false,
            tags:{
                blockStart: '{%',
                blockEnd: '%}',
                variableStart: '{{',
                variableEnd: '}}',
                commentStart: '{#',
                commentEnd: '#}'
            }
        },
        template: {
            templateRootPath: 'test/template/admin'
        }

    },
    targets: {
        schema: {
            overridable: true,
            targetRoot: 'src',
            targetModule: 'common',
            targetPackage: 'generater/schema',
            fileName: 'schema',
            fileType: 'js',
            prefix: '',
            suffix: '',
            template: '',
            enable: true,
            statically: true,
            dependencies: [],
        },
        entity: {
            overridable: true,
            targetRoot: 'src',
            targetModule: 'common',
            targetPackage: 'generater/entity',
            fileName: '${table}',
            fileType: 'js',
            prefix: '',
            suffix: '',
            template: 'entity.tpl',
            enable: true,
            statically: false,
            dependencies: ['schema'],
        },
        controller: {
            overridable: false,
            targetRoot: 'src',
            targetModule: '${module}',
            targetPackage: 'controller/${submodule}',
            fileName: '${entitykey}',
            fileType: 'js',
            prefix: '',
            suffix: '',
            template: 'controller.tpl',
            enable: true,
            statically: false,
            dependencies: ['service'],
        },
        web_entity_add: {
            overridable: false,
            targetRoot: 'view',
            targetModule: '${module}',
            targetPackage: '${submodule}/${entitykey}',
            fileName: '${entitykey}',
            fileType: 'html',
            prefix: '',
            suffix: '_add',
            template: 'web/entity_add.tpl',
            enable: true,
            statically: false,
            dependencies: ['controller'],
        },
    },

};
