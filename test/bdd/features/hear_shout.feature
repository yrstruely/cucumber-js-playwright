Feature: Hear Shout

    Shouty allows users to hear other users as long as they are close enough to each other.


    Rule: Shouts can be heard by other users

        Scenario: Listener hears a message
            Given a person named Lucy
            And a person named Sean
            When Sean shouts "Free bagels at Sean's"
            Then Lucy hears Sean's message


    Rule: Shouts should only be heard if listener is within range

        Scenario Outline: Only listener's in range can hear
            Given the range is <Range> meters
            And people are located at:
                | name     | Sean | Lucy |
                | location | 0    | 50   |
            When Sean shouts "Free coffee at Sean's"
            Then Lucy only hears Sean's message when she is in range

            Examples:
                | Range |
                | 100   |
                | 10    |


    Rule: Listeners can hear multiple shouts

        Scenario: Two shouts
            Given a person named Lucy
            And a person named Sean
            When Sean shouts "Free bagels at Sean's"
            And Sean shouts "Free coffee at Sean's"
            Then Lucy hears the following messages:
                | Free bagels at Sean's |
                | Free coffee at Sean's |
                

    Rule: Maximum length of a message

        @run-me
        Scenario: Message too long
            Given a person named Sean
            And a person named Lucy
            When Sean shouts the following message
            """
            01234567890123456789012345678901234567890123456789012345
            678901234567890123456789012345678901234567890123456789012345678901234
            5678901234567890123456789012345678901234567890123456789x
            """
            Then Lucy doesn't hear Sean's message