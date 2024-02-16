import CustomFetch from './custom-fetch'

const resourcesApi = new CustomFetch('/resources')

export class ResourcesApi {
  async getAvatar(path: string) {
    return resourcesApi.get(path)
  }
}
