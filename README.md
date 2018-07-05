# Maf-Generator

Maf-Generator is a code generate engine for Node Project, generate codes by you's template. 

# version log

**1.0.0  [2018-07-05]**

> first version



# Install

```
npm install maf-generator
```

# How to use

You can look for project dir, in test package is a simple demo.

The demo generate code is base on thinkjs framework implements. 

## step1. configuration

```
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
        copyright: 'Copyright © 2017 - 2018 [zhangyd915@163.com].All Rights Reserved'
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
```

**datasource** : database config, so far support for mysql, next support other database.

**authorInfo** : the author info generate by.

**strategy** :  generate strategy settings.

- fileOverridable: false, 
- camelCase: false, 
- project: '', 
- module: 'admin', 
- paramKey: []
- tableConfig: 
- generateTable: 

**template_config** : nunjucks template engine config and template config.

**targets** : the target you will generates.

## step2. template

You must make nunjucks templates,

Some like the test package : 

- [ ] entity.tpl
- [ ] controller.tpl
- [ ] web/entity_add.tpl

## Step3. generate

```
const {Generator} = require("../lib/Generator");
const config = require("./config");

const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '../'));

const generator = new Generator(rootPath, config);
generator.generator().then(function () {
    console.log('generate complated!');
    process.exit(0);
});

process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);
    process.exit(1) // To exit with a 'failure' code
});
```

**instance** : get Generator instance by param: rootPath, config

**params** : 

- rootPath: the project root path
- config: configuration



# usage

## before generate

![image-20180705150158418](/var/folders/yd/b36w22p92y3dkybk7ntqsbxh0000gn/T/abnerworks.Typora/image-20180705150158418.png)

after generate

![image-20180705150705708](/var/folders/yd/b36w22p92y3dkybk7ntqsbxh0000gn/T/abnerworks.Typora/image-20180705150705708.png)

# contact to me 

email: zhangyd915@163.com

qq: 410065512



If you have projects generate by **maf-generator**, plase pull request.

If you have any questions, plase contact to me.