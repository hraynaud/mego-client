<template>

  <div class="row">
    <div class="col-6">
      <CustFormCard icon="engineering" @submit="onSubmit" @reset="onReset" class="">
        <!--content for header slot-->
        <template #header> New Project </template>

        <!--Default slot content here-->
        <CustQInput v-model="description" type="textarea" label="What are trying to do?"
          hint="Describe you project is as much detail as you can" rows="15" :rules="[
            (val) => (val && val.length > 0) || 'Please enter project description',
          ]" :customClass="'q-pb-xl'" />


        <q-select v-model="topic" dense single outlined :options="topics" label="Topic" use-chips />

        <CustQInput v-model="name" label="Project name"
          :rules="[(val) => (val && val.length > 0) || 'Project name required']" />

        <q-btn flat color="primary" label="Add Task" no-caps @click="showNewTaskForm" />
        <q-dialog v-model="newTaskVisible" @before-show="clearNewTask">
          <ProjectTaskForm v-model="newTask" @submit="handleTaskSubmit" />
        </q-dialog>

        <q-expansion-item label="Task and Timeline" icon="calendar_month">
        </q-expansion-item>
        <q-separator />

      </CustFormCard>
    </div>

    <div class="col-6">
      <div class="q-py-lg q-mr-md" style="height:100%">
        <q-layout view="hHh lpR fFf" container class="shadow-2 rounded-borders"
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">


          <q-page-container>
            <q-page style=" padding-bottom: 75px;" padding>
              <div class="chat-container q-px-xs q-py-lg q-mx-xs">

                <div ref="chatMessagesRef" class="chat-messages q-mb-md">

                  <q-chat-message v-for="(message, index) in messages" :key="index" :sent="message.role === 'user'"
                    :bg-color="message.role === 'user' ? 'primary' : 'green-4'">
                    <div v-if="message.role === 'user'">
                      {{ message.content }}
                    </div>

                    <div v-if="message.role !== 'user'" v-html="renderMarkdown(message.content)">
                    </div>
                  </q-chat-message>


                  <q-chat-message v-if="isReceiving">
                    <div v-html="renderMarkdown(currentResponse)"></div>
                  </q-chat-message>
                </div>

              </div>

              <q-page-sticky position="bottom" class="q-mt-lg bg-primary text-white" expand>
                <q-toolbar class="q-py-sm ">
                  <q-input id="chat-input" rounded outlined borderless autogrow v-model="messageInput" type="text"
                    placeholder="ask me anything" dense @keyup.enter.prevent="sendMessage" :disable="isReceiving"
                    style="width: 100%">
                    <template v-slot:before>
                      <q-avatar size=" 24px">
                        <img src="../../assets/AI Avatar.svg" />
                      </q-avatar>
                    </template>
                    <template v-slot:append>
                      <q-icon name="arrow_circle_up" class="cursor-pointer" @click="sendMessage"
                        :disable="!messageInput.trim() || isReceiving" />
                    </template>
                  </q-input>
                </q-toolbar>
              </q-page-sticky>
            </q-page>
          </q-page-container>
        </q-layout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, onMounted, watch, nextTick } from 'vue';
import { topicService, projectService } from '../../core/services';
import { ProjectModel } from '../../core/models';
import { useRouter } from 'vue-router';
import CustQInput from './custom/CustQInput.vue';
import CustFormCard from './CustFormCard.vue';
import ProjectTaskForm, { Task } from './ProjectTaskForm.vue';
import { chatService } from 'src/core/services/chat.service';
import MarkdownIt from 'markdown-it'

interface FormTopic {
  id: string;
  label: string;
}

const arrTopic: FormTopic[] = [];
const router = useRouter();
const name = ref();
const description = ref('');
const startDate = ref();
const deadline = ref();
const topic = ref();
const topics = ref(arrTopic);
const newTaskVisible = ref(false);

const messageInput = ref('');
const messages = ref<ChatMessage[]>([]);
const isReceiving = ref(false);
const currentResponse = ref('');
const chatMessagesRef = ref<HTMLElement | null>(null);
let eventSource: EventSource | null = null;


const newTask = ref<Task>({ name: 'do something', status: 'not-started', notes: '' })

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const md = new MarkdownIt()

const renderMarkdown = (text: unknown) => {
  return md.render(text)
}
const onSubmit = async () => {
  const projectModel: ProjectModel = {
    name: name.value,
    description: description.value,
    startDate: startDate.value,
    // deadline: deadline.value,
    topicName: topic.value,
    id: '',
    topicImage: '',
    ownerAvatarUrl: '',
    ownerProfileImageUrl: '',
    progress: ['this', 'that'],
    openItems: [],
    roadBlocks: [],
    tasks: []
  };


  const project = await projectService.create(projectModel)
  router.replace(`/project/${project['id']}`);
};

const onReset = () => {
  name.value = null;
  description.value = '';
  deadline.value = null;
  startDate.value = null;
  topic.value = '';
};

function showNewTaskForm() {
  clearNewTask();
  newTaskVisible.value = true;
}

const clearNewTask = () => {
  newTask.value = { name: '', status: 'todo', notes: '' };
};

const hideNewTask = () => (newTaskVisible.value = false);

const handleTaskSubmit = () => {
  // const addMeTopic = {
  //   value: '',
  //   label: `${newTaks.value.name}`,
  // };

  window.alert(JSON.stringify(newTask.value))
  hideNewTask();
};

const $q = useQuasar();

onMounted(async () => {
  const data = await topicService.list();

  data.map((topic: any) => {
    const topx: FormTopic = { id: topic.id, label: topic.attributes.name };
    topics.value.push(topx);
  });
});


// Method to scroll chat to bottom
const scrollToBottom = async () => {
  await nextTick();
  if (chatMessagesRef.value) {
    const element = chatMessagesRef.value;
    element.scrollTop = element.scrollHeight;
  }
};

// Watch for changes to messages array and scroll down
watch(messages, () => {
  scrollToBottom();
}, { deep: true });

// Watch for changes to current response and scroll down
watch(currentResponse, () => {
  scrollToBottom();
});

// Send message to API
const sendMessage = async () => {
  const message = messageInput.value.trim();
  if (!message || isReceiving.value) return;

  currentResponse.value = '';
  // Add user message to chat
  messages.value.push({
    role: 'user',
    content: message
  });

  // messages.value.push({
  //   role: 'assistant',
  //   content: currentResponse.value
  // });
  // Clear input





  messageInput.value = '';

  // Start receiving
  isReceiving.value = true;


  try {
    //Close any existing connection

    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }

    // Use streaming chat service
    eventSource = chatService.sendStream(message, {
      onChunk: (chunk: string) => {
        currentResponse.value += chunk;

      },
      onComplete: () => {
        // Add completed message to chat history
        if (currentResponse.value) {
          messages.value.push({
            role: 'assistant',
            content: currentResponse.value
          });
        }
        console.error('Stream completed');
        isReceiving.value = false;
        currentResponse.value = '';
        eventSource = null;
      },
      onError: (error: Event) => {
        console.error('SSE Error:', error);

        if (!currentResponse.value && isReceiving.value) {
          $q.notify({
            color: 'negative',
            message: 'Failed to get a response from the server',
            icon: 'error'
          });
        } else if (currentResponse.value) {
          messages.value.push({
            role: 'assistant',
            content: currentResponse.value
          });
        }
        cleanup()
      }
    });
  } catch (error) {
    console.log('Chat error:', error);
    cleanup()
    $q.notify({
      color: 'negative',
      message: 'An error occurred while sending your message',
      icon: 'error'
    });
  }
};

// Clean up on component unmount
onMounted(() => {
  // Focus the input field when component is mounted
  nextTick(() => {
    const inputEl = document.querySelector('#chat-input');
    if (inputEl) inputEl.focus();
  });
});

// Cleanup function to be called when component is unmounted
const cleanup = () => {
  isReceiving.value = false;
  currentResponse.value = '';
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
};


</script>
<style lang="scss"></style>
