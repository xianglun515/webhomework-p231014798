export async function POST(request) {
  try {
    const API_KEY = 'sk-d0c2b31411e04444988c8c442531c993';
    const requestData = await request.json();
    
    // 构建发送到实际API的请求
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: requestData.messages,
        temperature: requestData.temperature || 0.7,
        max_tokens: requestData.max_tokens || 1000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // 如果API调用失败，使用本地模拟响应作为备份
      const lastUserMessage = requestData.messages.filter(msg => msg.role === 'user').pop();
      const userQuestion = lastUserMessage ? lastUserMessage.content : '';
      
      let responseContent = `我收到了您的问题："${userQuestion}"。作为QAnything智能助手，我会尽力提供有用的信息和帮助。很抱歉，当前服务暂时无法连接到后端，请稍后再试。`;
      
      const simulatedResponse = {
        id: `chatcmpl-${Date.now()}`,
        object: 'chat.completion',
        created: Math.floor(Date.now() / 1000),
        model: 'qanything-model',
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: responseContent
            },
            finish_reason: 'stop'
          }
        ],
        usage: {
          prompt_tokens: 100,
          completion_tokens: responseContent.length,
          total_tokens: 100 + responseContent.length
        }
      };
      
      return new Response(JSON.stringify(simulatedResponse), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 获取API响应
    const data = await response.json();
    
    // 修改响应以隐藏原始API信息
    const modifiedResponse = {
      ...data,
      model: 'qanything-model',  // 替换模型名称
      id: data.id.replace('deepseek', 'qanything')  // 替换ID中可能的标识
    };
    
    return new Response(JSON.stringify(modifiedResponse), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API处理错误:', error);
    
    // 发生错误时的备用响应
    const requestData = await request.json().catch(() => ({}));
    const messages = requestData.messages || [];
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    const userQuestion = lastUserMessage ? lastUserMessage.content : '';
    
    const responseContent = `我收到了您的问题："${userQuestion}"。作为QAnything智能助手，我会尽力提供有用的信息和帮助。很抱歉，当前服务暂时遇到技术问题，请稍后再试。`;
    
    const simulatedResponse = {
      id: `chatcmpl-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: 'qanything-model',
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: responseContent
          },
          finish_reason: 'stop'
        }
      ],
      usage: {
        prompt_tokens: 100,
        completion_tokens: responseContent.length,
        total_tokens: 100 + responseContent.length
      }
    };
    
    return new Response(JSON.stringify(simulatedResponse), {
      status: 200, // 返回200而不是错误状态，以确保前端能正常处理
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 