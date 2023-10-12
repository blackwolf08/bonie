import axios from 'axios';

const FieldService = {
  getField: function (id) {
    return {
      label: 'Sales region',
      required: false,
      choices: [
        'Asia',
        'Australia',
        'Western Europe',
        'North America',
        'Eastern Europe',
        'Latin America',
        'Middle East and Africa',
      ],
      displayAlpha: true,
      default: 'North America',
    };
  },
  saveField: async function (fieldJson) {
    const response = await axios.post(
      'http://www.mocky.io/v2/566061f21200008e3aabd919',
      fieldJson
    );
    console.log({ fieldJson, response: response.data });
    return response.data;
  },
};

export default FieldService;
