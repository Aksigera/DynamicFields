<?php
/**
 * Created by PhpStorm.
 * User: mediaten
 * Date: 28.10.16
 * Time: 11:23
 */

namespace app\widgets\DynamicFields;


use yii\bootstrap\Html;
use yii\widgets\InputWidget;

class DynamicFields extends InputWidget
{
    const HTML_SELECTOR = 'w-dynamic-fields';

    public $options;

    public function init()
    {
        DynamicFieldsAsset::register($this->view);
    }

    public function run()
    {
        Html::addCssClass($this->options, self::HTML_SELECTOR);
        $this->options['id'] = self::HTML_SELECTOR;
        Html::addCssClass($this->options['button'], self::HTML_SELECTOR);
        $this->options['button-add']['id'] = self::HTML_SELECTOR . '-addRow';

        return $this->render('dynamic-fields', ['w' => $this]);
    }
}