{% raw -%}{% extends "../../base/model-add.html" %}

{% block body_content %}
{% endraw %}
<div class="panel animated fadeIn">
    <div class="panel-body">
        <div class="layui-anim layui-anim-upbit">
            <form class="layui-form maf-form layui-form-pane" action="">
            {%- for field in entity.fields -%}
                {% if not (field.isPrimary or field.isBaseKey) %}
                <div class="layui-form-item {% if field.columnLen > 250 %}layui-col-md12{% else %}layui-col-md4{% endif %}">
                    <label class="layui-form-label">{{ field.comment }}</label>
                    <div class="layui-input-block">
                        <input name="{{ field.name }}" {% if field.isNotNull %}required{% endif %} {% if field.columnLen %}maxlength="{{field.columnLen}}"{% endif %} autocomplete="off" placeholder="请输入{{ field.comment }}" class="layui-input{% if field.isDate %} layui-date{% endif %}">
                    </div>
                </div>
                {%- endif -%}
            {%- endfor %}
            </form>
            <div class="layui-form-item layui-col-md12">
                <div class="text-center">
                    <button id="dosave" class="layui-btn layui-btn-normal">保存</button>
                    <button id="cancle" class="layui-btn">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>
{% raw -%}
{% endblock %}
{% block body_script_self %}
{{ super() }}
{% endraw %}
<script>
    $(document).ready(function () {

        $.layui.render();
        $('#dosave').click(function () {
            $.curd.doAddSave({
                url: '_add',
                model: '{{ entity.name }}',
            });

        });

        $('#cancle').click(function () {
            dialog.close();
        });

    });

</script>
{% raw -%}{% endblock %}{% endraw %}
