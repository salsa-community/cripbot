const { BotMock, SlackApiMock } = require('botkit-mock');
const {
    SlackAdapter,
    SlackMessageTypeMiddleware,
    SlackEventMiddleware,
} = require('botbuilder-adapter-slack');

const yourController = require('./yourController');

describe('slack message', () => {
    beforeEach(() => {
        const adapter = new SlackAdapter(SlackApiMock.slackAdapterMockParams);

        adapter.use(new SlackEventMiddleware());
        adapter.use(new SlackMessageTypeMiddleware());

        this.controller = new BotMock({
            adapter: adapter,
            disable_webserver: true,
        });

        SlackApiMock.bindMockApi(this.controller);
        yourController(this.controller);
    });
});
