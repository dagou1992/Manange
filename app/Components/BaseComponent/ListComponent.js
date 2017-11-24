import React, {Component} from 'react';
export default class ListComponent extends Component {
    /**
     * 表格结构
     * @return {*[]}
     */
    getTable() {
        return [];
    }

    /**
     * 导出数据的标题
     */
    getExportTitles() {
        const titles = this.getTable().filter(item => item.title != null && item.dataIndex != null).map(item => {
            return {
                title: item.title,
                index: item.dataIndex,
                filters: item.filters,
                type: item.type
            }
        });
        return titles;
    }

    /**
     * 导出数据
     */
    handleExport() {
        const titles = this.getExportTitles();
        const {requestExportList} = this.props;
        if (requestExportList != null) {
            requestExportList(titles);
        }
    }

    randomWord(randomFlag, min, max) {
        var str = "",
            pos = '',
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }

    IsUndefined(value) {
        for (var i in value) {
            if (value[i] == '' || value[i] == undefined) {
                return true;
            }
        }
        return false;
    }
}
