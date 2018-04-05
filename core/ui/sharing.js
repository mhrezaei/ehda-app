import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    Image
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import theme from '../theme'
import {Translate} from "../i18";
import Text from './text';

import Share from 'react-native-share';

const icons = {
    googleplus: {
        uri: 'data:image/png;base64,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'
    },
    telegram: {
        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAznSURBVHic7Z1bbBzVGcd/s7vHjp3L5DJJbMdO7BRabi65ARGYKgaS4ISSAkmLqqKqleCBVi1ULYWqj72AVNHLSyu1on2o2iJVfUCqVCq1iJKkUBII5AIkQAIJcWKPY8Z2bj67O304O9jZrO3dnfvu/J7s3dkzn/39z3/OnPnOWc22bRLql1TYASSESyKAOicRQJ2TCKDOSQRQ5yQCqHMSAdQ5iQDqnEzYAST4i2nJq4EdwBZgESrnfwCeNnQxqiUzgbWHacnrgO2oxF8zxWHvAKsSAdQIpiWvRyV9O3BVmR/7cSKAGGNacjWql28HrqyiideTMUDMMC25jgl7X+myueZEADHAtORNTNh7p4dNjyYCiCCmJTVgPaqX3wcs9+lUuxMBRIRC0m9B9fL7gPYATvtSMggMEdOSKeBWJpLeGnAIrYkDBIxpyTTwOZS93wssDSmU9wxdnEoEEACmJTPABlRPvxdYHGpAip2QTAX7RiHpt6OS/gXACDeiy0gE4DWmJQVwB8retwELw41oWl4CSAaBLjEt2QBsQvX0bcD8cCMqi0FDF0sgcYCqMC05C9iMSvrdwLxwI6qYXc4PiQDKxLRkE3Anyt7vAuaGG5Erdjo/JAKYBtOSzajn6DuArcDscCPyjEQAU2Facg4q2dtRyW8ONyLPOQe85vySCAAwLTkXZes7UDbfFG5EvvKKoQvp/FK3AjAtqQOfRyV9M9AYbkSBsXPyL3UlANOS81G3attRt24N4UYUCvUlANOSC1FJ34GapBHhRjQ9tm2jaZpfzeeA/05+oSYFYFrSQE2/7gBuI+J/p23bDA4OYZrDaJpGZ2c7TU2z/DjVm4YuRie/EOl/TCWYllwC3IOy9w3E5G8bHR3j5MnTjI9/Mi5jePhjmppa/DjdS8UvxOKfNBWmJVtQSd+BesSaDjei8hkfl/T3n2ZkZOyy9+bOnePXaXcWvxA7AZiWbEM9Ut0B9BCz1U2O3Q8MDFHqOUxLy+JEAMWYlmxHVcxsR5VN+TZK8pNSdj+Z1tYlGIZvDxDfN3TRX/xiZAVgWnI5E5Ww64lp0mF6u3fwOflQovdDxARgWrKTiZr3G8ONxj0z2b1Da+tSDGOB3+FEUwCmJT/FRE9fF3I4njGT3Tu0tS1l0SLfkw8l7gAgpIIQ05JXMrGkaXXgAfhIOXbvEGDyTUMXJesQA3MA05JXMWHvnw3qvEHh2P3g4BD5/Mydqq2thUWLAise2jXVG74KwLTkNUz09Ov8PFeYlGv3DsuWtbBwYaCVYyWv/+CDAExLdjOR9Ku9bj9KVGL3DiEkH/wWgGnJVUzY+6e9aDPKVGr3Du3tLSxYEHjyzwN7p3qzagGYllzDRE+/otp24kaldu/Q3t7KggW6T1FNyyUFIMVUJADTkjcwkfQul4HFimrs3iHE5MM09g8zCKCwYnXy2vQV3sUVD5Tdn2Fw0KzI7h06OlqZPz+05EOlAigk/WYmVqx2+BNX9BkdPVuw+/GKP6tp0N7exvz5oS4ZyFNUAFLMJwIwLbkSeAT1pG2Zv3FFGyklJ08OMDIyOvPBJYhI8kEVgIxMd0AGwLTk14BfAb49h4wDbu0eQNM0Ojpa0fXQkw9TTP9OJmNa8ovAMwEEE2nc2L2DSn4buh6ZRUPTXv9BOcD9AQQSWdzavUMEkw9lCmCD/3FEjwm7HyKfz7tqS9M0li9vY968SCX/qKGLkzMdlAH2Ab3+xxMdRkfP0t9/mosXq7d7B5X8ZcybF7nh04y9H5QA/kWdCMAru3eIcPKhAgE8CbQBD/saToh4afcOmqaxYsUyPws43TLjHQBMKggxLfkg8EP825QwFLy0e4cYJH8IWGzoYsZ72UsqggpbmN0DPIqaDYwtXtu9g0p+O3PnRnqrgOcMXWwr58BLauoNXeQMXfzV0MUtqKLMPwGVPfYKGdu2GRgY4vDho74kv7Mz8smHMq//UEZNoGnJZcA3gIdQ3zgRWfywe4dUSvX8OXMin3yAmw1dTPsMwKHsotDCHjkPAN9m6m+hCAW/7N4hZsk/D8w3dFFWL6iqKti05CbUOGEzIS7YsG0b0zzDwIB3o/tiUqkUnZ3tzJ4dm51iXjR0saHcg6taV2fo4p+GLvpQTvAb1L4zgTI2dpYjR45y6tRgkvxLKfv6Dx6tCyhswvAQaqzg6zbnUkr6+wewLH/s3iGmyQfoM3Txj3IP9nRhSGF/3O2ouoKbPGuYYOzeQSW/g9mzY7dXVB5YMFMNwGR8WxlkWnI9apxwLy6rj8fG1KNaP0b3xaRSKbq6Omhujl3yAd4wdLGqkg/4tjDE0MXLwJdMS3YA3wQeBCpaBxWU3TvEPPlQ5vTvZAJbG2hacjbwVeBbwGemOzZIu3eogeQD3G/o4tlKPhD44tBC0Wkfapywsfj9IO3eIZ1O0dm5nOZmXzZmCpJ2QxcfVfKBULeLNy15LUoIX5FSzgrS7h3S6TRdXR1+7coVJMcMXVS8ViMS3xdgWtI4ePDw8Xw+H2gWaij5AH80dPFApR+KxAZLhi7MfD6/J8hz1ljyoYoBIEREAAVeDupE6XSalStrKvlQ4QygQ+hbxEzilSBOksmk6epazqxZNbU39BngrWo+GCUH8F0ANZp8gF3lVP+UIjIC6O3pPg5cto+dV9Rw8qFK+4cICaCALy5Q48mHGhKA5wPBTCbDypUrajn5F4Cq76CiJgBPHUAlfzmNjTX9vRD/K7f6pxRRE8Ae1CNN1whRF8kHF/YPERNAb0/3GHDQbTtCZOjqqovkQy0JoIDry0BnZ90kPw/sdtNAzQlgfDzLgQOHkTJWyxmqZb+hC8tNA1EUgKs7AZnNceHCOHv3HsKyKt/RK2a4sn+IpgAOAVU+E7bJyhwA2WyOAweO0N8/4F1k0aP2BNDb052nyvvabPbSGwjbtnnvvRMcOXzMg8giSe0JoEBV4wCZzZV8/fTAGfa98Ta5XDDlZQHxgaGLE24bqSkBOPZfirHRc+zZe5Dz5y9UHVTEcN37IboCqHggmM/bM27tJsclr+97i6Ghj6sOLEJUVQBSTCQF0NvTfQr4sJLPTGX/xeRzNm+//T7HPphx/6SoU9MOABVeBrJlCgDAtuHE8VMcPHgkH4GSyGo4g7pbck1NCMDGJleBAByGh0dTe/fslzGcNNpdbQFIMTUhgGw2T7U9+cJFKfbsOZgbsUYrV1B4eGL/EG0B7AWy5RyYk+5u73K5fHr/gXdTJz46fcZVQ8HhyQAQIiyA3p7u88Cb5RybzZalk2mxbVs7dvSjhYcOvXvcdWP+4qoApJjICqDAjJeBfC5PrsqdvUsxMnLWymazDwIXPWvUW151UwBSTOwFkM15dOnWNFs0iJ/ftXldd8uipt+h9lA+5U3jnuLZ9R9qQQAur/8A6XTqXGNj6vatG9d8x3mtsLx9HR7arUfUlQDeAaactrPtyx8AVYrIpPfPEuOtfbeve6H4vcJK21tR+yVGAdcFIMVEYnHodLywc//zwKZS72VljrPnqrtUa2A3iMzTfZvWfrec401Lfh/4CeF2mjcNXVzvZYNRdwCY5jIgq7z+p9Opc6Kxobfc5AMYungKuBsoe/8dH/DU/iHmApju6d9UZDKZN1J209Itd6x+sdLPGrr4O7AeeLfiE3uD5wKI0uLQqSgpgHKe/k1GA1s0pH+2ZePax9wEY+jiLdOSNwLPUmKHE5+pPwfo7ek2gfeLX6+k96dS2tnGBrFhy8Z1rpLvYOhiGLXNzS+8aK9MPjR04fkkVeQFUOAyFyj3+i9Eel+a5pY7N675j5cBFXZWfxT4OsFMGnne+yE+Ari0QMSe+f5f07AbG8RTWzetW7217zrfyoMNXfwe9ZU7fk8aeTb/P5m4COASB1C9f+rrfzqdOtswK/O5vo1rHvc7MIDC1uw3MM3XtHtAXTvAa8An259Nd/3PiPTrFxeIJX23rfXlHzYVhQLNW4E/+9D8MB4smStFLATQ29MtUV9uBZQWgKZpdkNj5qd3bVq3ZvtNqwLfvRzA0MV5QxdfBp7Ao0WuBTwrACkmFgIo8Fvgb7lcnuI6rlQqNSYaUz1b7lj7g3BCuxRDF08C2/Bu0sg3N4v8VHAxz/9732MyKx/O5zBSKW04ldZ+vaJ98VPXXrU8chU9piWvBp4DrnDZVI+hi10ehHQZsRNA3DAtuQB3k0YXAd3QhS+3mnG6BMSSSZNGv6yyiVf9Sj4kAgiEwqTRI6hJo0qreXy9m0kEECCTJo1OV/CxRAC1hKGL3ahKo3ImjbKAL4M/h0QAITBp0ugvMxz6jKELXxcyJncBIWNa8gngR1zeGQeA1YYufF3EmAggApiWXA18D7gTGAReBB43dOH7QpVEAHVOMgaocxIB1DmJAOqcRAB1TiKAOicRQJ2TCKDOSQRQ5/wfbe/OJu1wA2wAAAAASUVORK5CYII='
    },
    instagram: {
        uri: 'data:image/png;base64,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'
    },
    facebook: {
        uri: 'data:image/png;base64,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'
    },
    share: {
        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAfFQAAHxUBCCdr8gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAt3SURBVHja7V17cBXlFUctVmtbKLVSnGq1jk47WEaFtoDSuY8k5O4lIEjoUCC7m9CADDG5L5B26Gx2NwiiSCswpcLYYYq2iNJORx4m9+4XcDCjMi20OminxQczbXkFFRQMcHvOJdSUyd372m/3S3L++E3+IQ/u77fnO+fsOb9vUDqdHkTwFhFt57ConqqJmWxjzLR2xgy2P2ZYRwFnogZ7F752RHXrhZiRejShswmapl3p1O8mAjxCwy+3fz5qWPOA7CQQ3AVI54u4YR2B790QNa2xJIA+Bnx64UmfA0S+UwjpNtjWZLR/hwTQBxDV2+8Gwg44RHxPnIsbqXWaZl1DAhCVfJNVw3l+mgP5PdHR1LJ7BAlAMMR01gzkXOBM/iUcjpjWGBKAKE++wZa6RHxPdCaM9ttJAB4jbrKpLj75l+Pg4uWtQ0gAXpHf0jYKSDjlEfmXysUduXoGRBavcx8SMi/J/0wETCUBuE5+apoI5HfjPbvykAhzGNVbtlyF569AAkhHTStOAnDr6TfZTJHI78ax+vWvDyYBuJH86dZWAQWACWEZCYB7n9+6xuvMPytMtpYEwL/urxKS/O4OIfyRV5AA+LZ8VwgsADgG2m8lAfAt/zaJLIComRxPAuBaAVhtIgsAMJ0EwPcIeENsAbAGEgDfCHBI7BzAWkwC4Nv/f0XoCGBaMgmAqwDY80ILoJmVkwD4RoA1IgsgoqdGkgD4toEXCiyAM/GVu64jAXDEYq31ZmEFoFvbqRXszgzgvpieErACYD8hAfCcA6iuvjoYUn5aPnneiWC4Nj37wSfT4giBnW9saRtOAuCEQEiuCEjK24B0TyxYsk2UCPAcDYRwQEWFelNQUrZeTvwl1MefEYH8ruiytjtIAA6HeyD4YcCpbORPmbmkS4gjwGTraSjUQZSFa8uA4IPZiA9IcpdfUh5vXPpiQoCz/3iuVTEiNU/4QnO/AQRvyU58BswXrruzR2Pot56G/mbmp8WQEjF6dP3gYEheFAjLH9kQ/y/4N7OyjIi96k3dn1pAq2ElZ/dqICCpb9oQfw6wOhSa9eVsP2OR9tKNMZ295WrNr1sraTm0BJRPrr0xEFKetQv3/rC8J1hZMyqfn9ekWUMvWr9wJ/9TePLraT282HPep30OQnkMCP7Qhvz/+ENyzaBBg64ofGEktYoj+UdjZvKHZBBRbHY/SfEFwsrfbMN9WH6yrKx+SCm/B0lydm+QnYWvq2OadT1ZxBSBCRNnjwByN9tm9yF1r09S7nLaMSRuWG+WkuUDno1obd8ik6giw71fUiNA8Ac25B+BJFAtNNwXZBGnp0bGDbake5ool5fASSQd188wryCbuCIRDCsTgNwDNsSfh3C/7r7wj7/itnUcEHtLXGfjombqgahuKbEWFkq0WHfFtV039LbYQQIohPjJc4cDuZtyNHM6IMMfPVA+k4HSu7/KL8kPAbkns5/zyjEI93N5hvsBIwC0JUlo1tfRFy9iWJUJPXUvriUV42NXKqBkuxcI/otduA+G1PUTJ9YNG4jHoXOE62wCnF2PQ5Lytr31KTue8b012ZyHH9nD7YytqJhzgz+k/AYIvpCN/KAkvxasVL43kKug0mbglrcOienWI+hdW2wpg0ZGETP5fSfDPZRtC4HgTpun/nhQUuc5abo8oASgaVuujptWEzpPONTQgPKH/T5hJG8rKcmbVDMuKCl/tiH+gl9SNviq6q+n5leRAogts77N0QPn07iZeqjgZk5I/RqUdhvtwj0keft8IWUskV6CALAm7W5G8F5hegqjTD65B4T7B4HgEzZPfac/rCygcF+iAHCzFKdLXXytuadB2571NatfUn+AT7VduAc8jdGBiC5RANiV8sLyFBNEfIv2f+f81JqvBiT5Kdtwj2VfWB1PBDsgAKzlXbA5z+5qoVtPXAr3mLljBm9D/MlAWGnASoDIdUAAeJcNkPC+18ONSuOGn2HNnqOFuwlbvUSqgwKAD/8xr8lv/PmOdMWU+edtiD+AL3eITIcFEDXbbwICPvFaAPLCX2Uj/gN8nYuvdYlIDgKAUuxpEdaacLumF/I34yAHEchJAN1nf5com62z5q1Oh6Y1pKUHGt/C0S0ijrMAMpcYirnnvpdIc0UAeEulkAK4gK+ZiTiOAsB39l7W/cUaHRAcEgDeQim03anOfkHEcRRA3EgGBDc73ELEcRQAnP+zhY4AhvUyEcc1ArCEyAKImewfRBxPAVyc9BHZ8fogEcfzCDCtHwkuAIuI4ygAnO4VOwdgm4k4ngIwkrcJXQUUYH5AKKoRpF1Zwpi3C9eesGoijnMrGDLtjaIaHi9a8fKXiDje7wKM1GThrM6b27IaHhOcfh28au+18KF/JArxM9Rl6UBYTZdV1R/FJU+a+XNhIATyAFMEAcyNbOp16he3gIhAjgLAmfyM8ZDXA6ENv6Y1Lw+HQhu9f/uXTEvTmz6xW/T0h+X6gbbX74oAcD0Lp3A89rs9Oz/xTCVatmSsW2ycPQJV6j1EqsOLITiB4+VuAOQidf8zdpJqx+TYDzgPx8Ia3/3KUCLXwdWwREvyHiDjYw8EsLrXhVBJmZ9jIfTfgDlEsJPLoc2sHAjpdNPn/vK9wMtXwnH5M8eOYLt/ojySiHZoPRxvnuDoDfCZa4huLczb4bOy9j57yze5KxCSV/p8C75IhDtgEJExPjasbZzIP4wjaSWYPtp4/MrvB0PqdCLdIY8gSM58gNccIv4kumViB7KU/wy6fEMS+LscS6S7yicptxP5DphEoXNl9wBJa8aqvHAnkL+jyVSxRsdZj4Wc17ooZ4JhRR9XXX0tCcChH4SOYRfFkNrU7YaNpeO5HoSfAPwVX+jgNeY4fs7ZHDJzjx+Q/XFWz39J+WdQUieRAHiRAFk89hE07U9f8MwUulK5JRBS/2h3LAQl5Q8Bqe6bJIB+jEBIqQKyD9kI4TRGDIwcJIB+CjzzoRowgOyzNkI46K+UgySAfoygVHMHEP2S7Z1AUE1gVeHm30V28S7DL8kzgOzDNkL4kLcLCV0Y4TGwQxgIq49lOoY2PkTYcXTy99KVMaIJIVx3JxC9m7fxJF0aJXp+EFZlvBrORgj4FnJ+odazdG1cX4oG9ytDg5Ky1m4ABecScD4h7/cndHFkH0wSw/JoIPvVUi6Xoqtj+zjyHEA5AlAun0uky6P7EfIZQMH7hMsk5bs9hmrp+vh+dyxcvIRqv+0AiiSvalz6ogBGG+x4U8vuESQAx3sHuQdQpsxc0gVhWARHlfUkAE7INYCCNrcCbFd14SgfCYDnsVApB3sbQFmwZJsoy7XPkQA449IAStmkutPBsJqeUbs8LcQRcDEXON/Y0jacBOACooa1L6K19hmHVSLNQSzWWm8W1l4ni7cCEecgcJ9BYH+lM/GVu64jAXAEfMhrRDbYwtkDEgBXAbDnhfZYbGblJAC+EeAVsW12LZkEwFMApnVIcKf1xSQAngLQ2Rti2+yyBhIA3wjQJrjP8nQSANccILMWJ67PspkcTwLgewSsEDsHaL+VBMCzEWSyKoEFcLi3xRIiztHxscwI2ClBb1pZS61gd9rBWwUtActIAK5UAmymgAI4Vr/+9cEkADfmAjILINyNtArM/q04DYS4Ww5OE0gA72FuQgJw/71AhyCDICoNhXqRDLa0jfK6IoDEb0euHUYii29fYGoeO//c7ldE4y5aDPF8RpAt9YD8zoTRnpcXIpHkTou42cVIcDhiWmPy/duIILcigcmqIRqc5kx+R65VMBKAlyLQ2+8Gkg5wIP5c3Eitsyv3SAACrZvHTDYHSHvHIfK3leK6SqR4BLSEixrWvJjBkt2GT4WUd0fgezdETWssuYT1A0S0ncOieqomc2NrxkqG7e++se0M5A3v4tke1a0XYkbqUbzcu1B/Ijv8Fx6e+pWiy4YeAAAAAElFTkSuQmCC'
    },
    other: {
        uri: 'data:image/png;base64,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'
    }
};

class Sharing extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        value: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            translateY: new Animated.Value(-1),
            content: null
        };

        this.show = this.show.bind(this);
        this.onCancelClicked = this.onCancelClicked.bind(this);
        this.onShare = this.onShare.bind(this);
    }

    onShare(to) {
        try {
            let options = {
                url: this.state.content.uri,
                type: 'image/png',
                message: this.state.content.message,
                title: this.state.content.title,
                subject: 'Share to:',
                social: to
            };
            try {
                if (['twitter', 'facebook', 'whatsapp', 'googleplus', 'email'].includes(to))
                    Share.shareSingle(options).catch(x=>{});
                else
                    Share.open(options).catch(x=>{});
            } catch (x) {

            }
        }catch (x){

        }
    }

    onCancelClicked() {
        this.hide();
    }
    componentWillReceiveProps(nextProps) {

        if(nextProps.visible){
            this.show(nextProps.value);
        }else{
            this.hide();
        }
    }

    show(content) {

        if (!content)
            return;

        Keyboard.dismiss();

        this.state.translateY.setValue(-1);
        Animated.timing(
            this.state.translateY,
            {
                toValue: 0,
                duration: 500,
            }
        ).start();


        this.setState({
            show: true,
            content: content
        });
    }

    hide() {
        this.state.translateY.setValue(0);
        Animated.timing(
            this.state.translateY,
            {
                toValue: -1,
                duration: 500,
            }
        ).start(() => {

            this.setState({
                show: false
            });
        });
    }

    render() {

        return (this.state.show &&
            <TouchableWithoutFeedback onPress={() => {
                if(this.props.hide)
                    this.props.hide();
            }}>
                <Animated.View collapsable={false} style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 999,
                    opacity: this.state.translateY.interpolate({
                        inputRange: [-1, 0],
                        outputRange: [0, 1]
                    })
                }}>
                    <KeyboardAwareScrollView
                        contentContainerStyle={{
                            flexGrow: 1, flexDirection: 'column-reverse', justifyContent: 'space-between'
                        }}>

                        <TouchableWithoutFeedback onPress={() => {
                        }}>
                            <Animated.View style={{
                                padding: 20,
                                zIndex: 999,
                                backgroundColor: '#fff',
                                transform: [{
                                    translateY: this.state.translateY.interpolate({
                                        inputRange: [-1, 0],
                                        outputRange: [300, 0]
                                    })
                                }]
                            }}>


                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    paddingHorizontal: 5,
                                }}>

                                    <Image source={icons.share} style={{width: 20, height: 20, marginHorizontal: 10}}
                                           resizeMode={'contain'}/>

                                    <Text>{Translate('shareWith')}</Text>
                                </View>


                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: 20,
                                    paddingHorizontal: 5,
                                }}>
                                    <TouchableOpacity style={{flex: 1}} onPress={x => this.onShare('instagram')}>
                                        <Image source={icons.instagram} style={{height: 45}} resizeMode={'contain'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex: 1}} onPress={x => this.onShare('telegram')}>
                                        <Image source={icons.telegram} style={{height: 45}} resizeMode={'contain'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex: 1}} onPress={x => this.onShare('facebook')}>
                                        <Image source={icons.facebook} style={{height: 45}} resizeMode={'contain'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex: 1}} onPress={x => this.onShare('googleplus')}>
                                        <Image source={icons.googleplus} style={{height: 45}} resizeMode={'contain'}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{flex: 1}} onPress={x => this.onShare('other')}>
                                        <Image source={icons.other} style={{height: 45}} resizeMode={'contain'}/>
                                    </TouchableOpacity>
                                </View>

                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </KeyboardAwareScrollView>


                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
};

Sharing.Icons = icons;

const styles = StyleSheet.create({
    calendar_row_buttons: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuItem: {
        flex: 1,
        borderBottomColor: theme.border,
        borderBottomWidth: 1
    },
    menuItem_direct: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    menuItem_text: {
        fontFamily: theme.font
    },
    menuItem_icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        paddingTop: 2
    }
});


export default Sharing;