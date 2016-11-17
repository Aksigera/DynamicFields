<?php
/**
 * Created by PhpStorm.
 * User: mediaten
 * Date: 28.10.16
 * Time: 11:23
 */

namespace app\widgets\DynamicFields;


use yii\web\AssetBundle;
use yii\web\JqueryAsset;

class DynamicFieldsAsset extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = __DIR__.'/dist';

        $this->js = [
            'dynamic-fields.js',
        ];

        $this->css = ['dynamic-fields.css'];

        $this->depends = [
            JqueryAsset::className(),
        ];
    }
}