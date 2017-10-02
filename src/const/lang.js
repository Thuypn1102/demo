import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({

    en: {
        language: "Language",
        lang: 'English',
        assignee: 'Assignee',
        task_detail: 'Task Detail',
        status: 'Status',
        category: 'Category',
        product: 'Product',
        action: 'Action'
        
    },
    vi: {
        language: "Ngôn ngữ",
        lang: 'Tiếng Việt',
        assignee: "Thực hiện",
        task_detail: 'Công việc',
        status: 'Trạng thái',
        category: 'Loại',
        product: 'Sản phẩm',
        action: 'Hành động'

    },
});

export default strings;
