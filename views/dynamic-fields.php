<?php
/**
 * @var \yii\web\View $this
 * @var \app\widgets\DynamicFields\DynamicFields $w
 */

use yii\bootstrap\Html;

echo Html::beginTag('div', $w->options);
echo Html::activeHiddenInput($w->model, $w->attribute);
echo Html::button('+', $w->options['button-add']);
echo Html::endTag('div');

//JS config pipe is here
$jsonStructure = isset($w->options['jsonStructure']) ? $w->options['jsonStructure'] : 'name-value';
$js = <<<JS
    window.DynamicFields = {
        config: {
            jsonStructure: "$jsonStructure"
        }
    };
JS;
echo '<script>' . $js . '</script>';
