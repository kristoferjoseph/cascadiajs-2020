/* global window document */
import Speakers from '../pages/speakers.js'

(function Main() {
  let selectedTopics = []
  addEventHandlers()

  async function getData(url) {
    let data = await(await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
    })).json()
    update(data)
  }

  function update(data) {
    let container = document.getElementById('js-speakers')
    if (container) {
      container.innerHTML = Speakers(data)
      addEventHandlers()
    }
  }

  function addEventHandlers() {
    let topics = document.querySelectorAll('.js-topic')
    Array.prototype.forEach.call(
      topics,
      t => t.onclick = e => {
        e.preventDefault()
        let data = t.dataset || {}
        let topic = data.topic
        let action = selectedTopics.includes(topic)
          ? removeTopic
          : addTopic
        selectedTopics = action(selectedTopics, topic)
        let url = window.location.pathname + getTopicParams(selectedTopics)
        getData(url)
      }
    )
  }

  function addTopic(topics, topic) {
    topics.push(topic)
    return [...new Set([...topics])]
  }

  function removeTopic(topics, topic) {
    topics.splice(topics.indexOf(topic), 1)
    return topics
  }

  function getTopicParams(selectedTopics) {
    selectedTopics = selectedTopics || []
    return selectedTopics.length
      ? `?topics=${selectedTopics.join(',')}`
      : ''
  }
}())
