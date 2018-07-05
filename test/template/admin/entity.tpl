const {Entity, Field} = require('../../extend/entity');

module.exports = {
    {{ entity.tableName }} : new Entity('{{ entity.name }}', '{{ entity.tableName }}', '{{ entity.comment }}', {
        {% for field in entity.fields %}
        {{ field.name }}: new Field('{{ field.name }}', '{{ field.type }}','{{ field.comment }}', '{{ field.columnName }}', '{{ field.columnType }}', {{ field.isPrimary }}, {{ field.isUnique }}, {{ field.isNotNull }}),
        {% endfor %}
    }),
};
