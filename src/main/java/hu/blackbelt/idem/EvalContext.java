package hu.blackbelt.idem;

import lombok.Builder;

import java.util.Map;

@Builder
public class EvalContext {
    Map<String, Object> self;
}
