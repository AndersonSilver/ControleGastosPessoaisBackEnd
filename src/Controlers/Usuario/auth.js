import api from './api';

async function searchDadosPessoais() {
  try {
    const response = await api.get('/searchDadosPessoais?email=joao@joao.com');
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
export default searchDadosPessoais;